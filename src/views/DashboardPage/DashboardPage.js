import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Operations } from '../../redux/transactions';
import { selectorsAuth } from '../../redux/auth';
import { Selectors } from '../../redux/transactions';

import routes from '../../routes';

import Container from '../../components/Container/Container';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance';
import Currency from '../../components/Currency';

import Modal from '../../components/Shared/Modal';

import { Route, Switch } from 'react-router';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';

import { lazy } from 'react';

const HomeTab = lazy(() => import('../../components/HomeTab/HomeTab'));
const DiagramTab = lazy(() => import('../../components/DiagramTab'));

export default function DashboardPage() {
  const isShowModal = useSelector(selectorsAuth.getShowModal);

  const location = window.location.pathname;

  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Operations.getTransaction());
    dispatch(Operations.getTransactionsStatistic());
  }, [dispatch]);

  const transactionsList = useSelector(Selectors.getAllTransactions);

  return (
    <>
      <div className="dashboard-bcgi">
        <Container>
          <div className="dashboradPage">
            <div className="nav-container">
              <div className="nav-tablet-container">
                <Navigation />
                {location === '/home' && isMobile && (
                  <Balance className="balance" />
                )}
                {!isMobile && <Balance className="balance" />}
              </div>
              {!isMobile && <Currency className="currency" />}
              {isShowModal && (
                <Modal>
                  <ModalAddTransaction />
                </Modal>
              )}
            </div>
            <span className="splitter"></span>
            <Switch>
              <Route
                path={routes.home}
                render={props => (
                  <HomeTab {...props} tableData={transactionsList} />
                )}
              />
              <Route path={routes.diagram} component={DiagramTab} />
              <Route path={routes.currency} component={Currency} />
            </Switch>
          </div>
        </Container>
      </div>
    </>
  );
}
