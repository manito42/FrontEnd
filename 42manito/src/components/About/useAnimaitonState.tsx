import { useState } from "react";

export default function useAnimationState(initialState: boolean = true) {
  const [state, setState] = useState(initialState);

  const updateAnimation = (isVisible: boolean) => {
    setState(isVisible);
  };

  return { state, updateAnimation };
}
