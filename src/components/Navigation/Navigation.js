import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import routes from '../../routes';
import home from '../../images/home.png';
import stat from '../../images/stat.png';
import currency from '../../images/currency.png';

export default function Navigation() {
  const isTabletToDesktop = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });

  return (
    <div>
      <nav className="NavigationDashbord">
        <NavLink
          exact
          to={routes.home}
          className="NavLink First"
          activeClassName="NavLinkActive"
        >
          <img src={home} className="ImageNav" alt="home page" />
          {isTabletToDesktop && 'Главная'}
        </NavLink>
        <NavLink
          exact
          to={routes.diagram}
          className="NavLink"
          activeClassName="NavLinkActive"
        >
          <img src={stat} alt="statistic page" className="ImageNav" />
          {isTabletToDesktop && 'Статистика'}
        </NavLink>

        {isMobile && (
          <NavLink
            exact
            to={routes.currency}
            className="NavLink"
            activeClassName="NavLinkActive"
          >
            <img src={currency} alt="currency" className="ImageNav" />
          </NavLink>
        )}
      </nav>
    </div>
  );
}
