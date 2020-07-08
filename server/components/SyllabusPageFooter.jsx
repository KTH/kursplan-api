import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "./SyllabusStyles";

const SyllabusPageFooter = ({ data }) => {
  return (
    <Text
      render={({ pageNumber, totalPages }) =>
        `\n${pageNumber - 1} (${totalPages - 1})`
      }
      fixed
    />
  );
};

export default SyllabusPageFooter;
