import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './loader.module.css';

const Load = () => {
  return (
    <div className={css.wrapper}>
      <div className={`${css.container}`}>
        <div className={`${css.box} ${css['box-1']}`}></div>
        <div className={`${css.box} ${css['box-2']}`}></div>
        <div className={`${css.box} ${css['box-3']}`}></div>
      </div>
    </div>
  );
  // for scss
  return (
    <div className="wrapper">
      <div className="container">
        <div className="box box-1"></div>
        <div className="box box-2"></div>
        <div className="box box-3"></div>
      </div>
    </div>
  );
};

export default Load;
