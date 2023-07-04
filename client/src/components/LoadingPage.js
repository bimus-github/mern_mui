import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dotWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function LoadingPage() {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <div className={classes.dotWrapper}>
        <CircularProgress
          variant="indeterminate"
          size={50}
          thickness={4}
          color="primary"
          style={{ marginRight: 10, animation: "grow-shrink 1s infinite" }}
        />
        <CircularProgress
          variant="indeterminate"
          size={50}
          thickness={4}
          color="primary"
          style={{
            marginRight: 10,
            animation: "grow-shrink 1s infinite",
            animationDelay: "0.3s",
          }}
        />
        <CircularProgress
          variant="indeterminate"
          size={50}
          thickness={4}
          color="primary"
          style={{
            animation: "grow-shrink 1s infinite",
            animationDelay: "0.6s",
          }}
        />
      </div>
    </Backdrop>
  );
}

export default LoadingPage;
