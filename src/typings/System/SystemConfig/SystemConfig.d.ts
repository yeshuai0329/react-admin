import React from "react";

export interface ISiderMenuConfig {
  label: string,
  value: string,
  type: string,
  render?: () => React.ReactElement
}