import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import {ENTITY_EDIT, ENTITY_LIST} from "../../../constants/pages";
import {Button} from "@material-ui/core";

const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Initial = ({
  authorities,
}) => {
  const classes = getClasses();
  const {
    availableItems,
  } = useSelector(({ reducer })=> reducer);
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });

  return (
    <div className={classes.container}>
      <div className="navbar__links">
        <Link to="/entityList">Список сущностей</Link>
        <Link to="/entityEdit/5">Посты</Link>
        {/*<Link to="/entityEdit">РедактПоста</Link>*/}
      </div>
      {/*{canSeeList && availableItems.map((item, index) => (*/}
      {/*  <Link*/}
      {/*    href={index % 2 === 0*/}
      {/*      ? `https://www.google.com.ua/search?q=${item}&hl=ru`*/}
      {/*      : undefined}*/}
      {/*    to={index % 2 !== 0*/}
      {/*      ? (location => ({*/}
      {/*        ...location,*/}
      {/*        pathname: `/${item}`,*/}
      {/*        search: `${location.search}&newProp=42`,*/}
      {/*      }))*/}
      {/*      : undefined}*/}
      {/*  >*/}
      {/*    <Typography>*/}
      {/*      {item}*/}
      {/*    </Typography>*/}
      {/*  </Link>*/}
      {/*))}*/}
      {/*{!canSeeList && (*/}
      {/*  <Typography>*/}
      {/*    Не могу ничего показать :(*/}
      {/*  </Typography>*/}
      {/*)}*/}
    </div>
  )
};

export default Initial;
