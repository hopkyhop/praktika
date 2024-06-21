import React from "react";
import Type1 from "./Type1";
import Type2 from "./Type2";
import Type3 from "./Type3";
import Type4 from "./Type4";
import Type5 from "./Type5";
import Type6 from "./Type6";
import Type7 from "./Type7";
import Type8 from "./Type8";
import Type9 from "./Type9";

const TypeIcon = ({id}) => {
  return (
    <div className="position-absolute p-0" style={{width: 40, height: 40}}>
      {id === 1 && <Type1 />}
      {id === 2 && <Type2 />}
      {id === 3 && <Type3 />}
      {id === 4 && <Type4 />}
      {id === 5 && <Type5 />}
      {id === 6 && <Type6 />}
      {id === 7 && <Type7 />}
      {id === 8 && <Type8 />}
      {id === 9 && <Type9 />}
    </div>
  );
};

export default TypeIcon;
