import toast from "react-hot-toast";
import { transactionServices } from "@elrondnetwork/dapp-core";

const useToastTransactions = (transactionId: string | null) => {
	const onSuccess = (t: any) => {
		toast.success("Transaction succesful!");
	};
	const onCompleted = (t: any) => {
		toast.success("Transaction completed!");
	};
	const onCancelled = (t: any) => {
		toast.error("Transaction cancelled!");
	};
	const onFail = (t: any) => {
		toast.error("Transaction failed!");
	};

	const transactionStatus = transactionServices.useTrackTransactionStatus({
		transactionId,
		onSuccess,
		onFail,
		onCancelled,
		onCompleted,
	});

	return transactionStatus;
};

export default useToastTransactions;
