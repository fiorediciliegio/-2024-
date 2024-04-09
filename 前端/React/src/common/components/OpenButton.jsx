import * as React from "react";
import Button from "@material-ui/core/Button";

export default function OpenButton({ onClick, children }) {
  return (
    <Button variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
}
