import { refreshAccount, sendTransactions, useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { Balance } from "@elrondnetwork/erdjs/out";
import axios from "axios";
import Button from "components/buttons";
import Input from "components/input";
import { contractAddress as mainnetContractAddress } from "config";
import { contractAddress as devnetContractAddress } from "config.devnet";
import { motion } from "framer-motion/dist/framer-motion";
import useTimeUntilLaunch from "hooks/useTimeUntilLaunch";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import whitelistedAddresses from "./data.json";

const variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const conversionRate = 0.0003;
const contractAddress =
  process.env.REACT_APP_ELROND_NETWORK === "mainnet"
    ? mainnetContractAddress
    : devnetContractAddress;
const environment =
  process.env.REACT_APP_ELROND_NETWORK === "mainnet"
    ? ""
    : process.env.REACT_APP_ELROND_NETWORK + "-";

const LabelButton = (props: any) => (
  <button
    type="button"
    className="flex px-2 py-1 text-sm font-bold uppercase rounded bg-purple-darker text-purple"
    {...props}
  >
    Max
  </button>
);

const BuyCard = () => {
  const { address, account, ...rest } = useGetAccountInfo();

  const [totalLandBalance, setTotalLandBalance] = useState(0);
  const [egldPrice, setEgldPrice] = useState(0);
  const [egldAmount, setEgldAmount] = useState("0");
  const [landAmount, setLandAmount] = useState("0");
  const isWhitelisted = useMemo(
    () =>
      whitelistedAddresses.data.some(
        (waddress: any) => waddress.address.trim() === address.trim()
      ),
    [address]
  );

  const { timeLeft } = useTimeUntilLaunch(isWhitelisted);

  const handleChangeEgldAmount = (e: any) => {
    const regex = RegExp(/[0-9]+/g);
    const test_result = regex.test(e.target.value);

    if ((test_result && e.target.value <= 1) || e.target.value == "") {
      setEgldAmount(e.target.value);
      setLandAmount((e.target.value / conversionRate).toFixed(4));
    }
  };

  const handleChangeLandAmount = (e: any) => {
    const regex = RegExp(/[0-9]+/g);
    const test_result = regex.test(e.target.value);

    if ((test_result && e.target.value <= 3333.3333) || e.target.value == "") {
      setLandAmount(e.target.value);
      setEgldAmount((e.target.value * conversionRate).toFixed(4));
    }
  };

  const buyToken = async (e: any) => {
    e.preventDefault();
    const tx = {
      value: Balance.egld(egldAmount),
      data: "buy",
      receiver: contractAddress,
    };
    await refreshAccount();
    const transaction = await sendTransactions({
      transactions: tx,
    });
    toast("Sending transaction.");
    toast("You are buying " + landAmount + " LAND");
  };

  useEffect(() => {
    axios
      .get(`https://${environment}api.elrond.com/economics`)
      .then((res: any) => {
        setEgldPrice(res.data.price);
      });
  }, []);

  useEffect(() => {
    if (account.address != "") {
      axios
        .get(
          `https://${environment}api.elrond.com/accounts/${account.address}/tokens`
        )
        .then((res: any) => {
          if (res.data?.length > 0) {
            const tokens = res.data.filter(
              (a: any) =>
                a?.identifier === "LAND-40f26f" || a?.ticker === "LAND-40f26f"
            );
            setTotalLandBalance(
              tokens.length > 0 ? tokens[0].balance / 10 ** 18 : 0
            );
          }
        });
    }
  }, [account]);

  const totalEgldBalance = useMemo(
    () => (account ? parseInt(account.balance) / 10 ** 18 : 0).toFixed(4),
    [account]
  );
  const disabled =
    egldAmount === "0" ||
    landAmount === "0" ||
    !egldAmount ||
    !landAmount ||
    timeLeft > 0 ||
    !isWhitelisted;

  return (
    <motion.div variants={variants} className="pb-10 card">
      <h2 className="mb-10">Buy LAND Token</h2>
      <form className="flex flex-col gap-5 text-left" onSubmit={buyToken}>
        <Input
          label="YOU BUY"
          tag="LAND"
          value={landAmount}
          onChange={handleChangeLandAmount}
        />
        {address && (
          <span className="tiny-label">You have {totalLandBalance} LAND</span>
        )}
        <Input
          label="YOU PAY"
          tag="EGLD"
          value={egldAmount}
          onChange={handleChangeEgldAmount}
          LabelButton={
            <LabelButton
              onClick={() =>
                handleChangeEgldAmount({
                  target: {
                    value:
                      parseInt(totalEgldBalance) < 1
                        ? parseInt(totalEgldBalance) - 0.075
                        : 1,
                  },
                })
              }
            />
          }
        />
        {address && (
          <p className="tiny-label">
            <span>Minimum buy 0.2 $EGLD</span>
            <span>You have {totalEgldBalance} EGLD</span>
            <span>
              You will receive 20% unlocked and 80% locked tokens (
              <a href="https://twitter.com/landboard_io/status/1494239023094767619?s=21">
                see vesting period here
              </a>
              )
            </span>
          </p>
        )}

        {!isWhitelisted && address && (
          <span className="-mb-8 text-sm font-bold">
            You are not whitelisted. The list updates periodically.
          </span>
        )}
        {isWhitelisted && (
          <span className="-mb-8 text-sm font-bold text-purple">
            You are whitelisted!
          </span>
        )}
        <Button
          className="w-full filled"
          containerClassname="mt-5"
          type="submit"
          disabled={disabled}
          hideComingSoon={!isWhitelisted || !address}
        >
          BUY $LAND
        </Button>
        <span className="text-xs font-bold">
          1 EGLD= ${egldPrice} | 1 EGLD = 3333 LAND
        </span>
      </form>
    </motion.div>
  );
};

export default BuyCard;
