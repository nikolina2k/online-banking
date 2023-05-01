import { useEffect } from "react";
import { Account } from "../components/Board/Board";
import Timeline from "../components/Timeline/Timeline";
import { Operation } from "../components/TimelineItem/TimelineItem";
import {
  loadOperationsAction,
  loadOperationsFailureAction,
  loadOperationsSuccess,
} from "../redux/operations/actions";
import { getOperations } from "../services/requestMock";
import { connect } from "react-redux";

interface TimelinePageProps {
  accountId: number;
  accounts: Account[];
  operations: Operation[];
  loadOperations: () => void;
  loadOperationsSuccess: (ops: Operation[]) => void;
  loadOperationsFail: () => void;
}

const TimelinePage: React.FC<TimelinePageProps> = ({
  accountId,
  operations,
  loadOperations,
  loadOperationsSuccess,
  loadOperationsFail,
}) => {
  const fetchOperations = async () => {
    loadOperations();
    try {
      const accounts = await getOperations(accountId);
      loadOperationsSuccess(accounts);
    } catch (error) {
      loadOperationsFail();
    }
  };

  useEffect(() => {
    fetchOperations();
  }, [accountId]);

  return <Timeline items={operations} />;
};

const mapStateToProps = (state) => ({ operations: state.operations });
const mapDispatchToProps = (dispatch) => ({
    loadOperations: () => dispatch(loadOperationsAction()),
    loadOperationsSuccess: (operations) =>
    dispatch(loadOperationsSuccess(operations)),
    loadOperationsFail: () => dispatch(loadOperationsFailureAction()),
});

export { TimelinePage };

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
