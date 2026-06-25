import { useEffect, useRef } from "react";

export function useWhyDidYouUpdate(name, props) {
  const prevProps = useRef(props);

  useEffect(() => {
    const changes = {};

    Object.keys(props).forEach((key) => {
      if (prevProps.current[key] !== props[key]) {
        changes[key] = {
          from: prevProps.current[key],
          to: props[key],
        };
      }
    });

    console.log(`${name} rendered`);
    console.log(changes);

    prevProps.current = props;
  });
}