import './shards-styles/shards-dashboards.1.1.0.min.css';
import './App.css';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { UseWalletProvider } from 'use-wallet';
import Analytics from 'react-router-ga';
import {
  CHAIN_ID,
  RINKEBY_CHAIN_ID,
  RINKEBY_RPC_URL,
  RPC_URL,
} from './world/constants';
import WorldTokenContext from './contexts/WorldTokenContext';
import DefaultLayout from './components/layout/DefaultLayout';
import Farm from './views/Farm';
import PageNotFound from './views/PageNotFound';
import Overview from './views/Overview';
import PageInProgress from './views/PageInProgress';
import SidebarContext from './contexts/SidebarContext';
import ConnectWalletContext from './contexts/ConnectWalletContext';

const Providers = ({ children }) => (
  <UseWalletProvider
    chainId={CHAIN_ID}
    connectors={{
      walletconnect: { rpcUrl: RPC_URL },
    }}
  >
    <WorldTokenContext>
      <SidebarContext>
        <ConnectWalletContext>
          {children}
        </ConnectWalletContext>
      </SidebarContext>
    </WorldTokenContext>
  </UseWalletProvider>
);

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Analytics id="UA-185956664-1">
          <DefaultLayout>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/overview"/>
              </Route>
              <Route path="/overview">
                <Overview/>
              </Route>
              <Route path="/farm">
                <Farm/>
              </Route>
              <Route path="/marketplace">
                <PageInProgress/>
              </Route>
              <Route path="*">
                <PageNotFound/>
              </Route>
            </Switch>
          </DefaultLayout>
        </Analytics>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
