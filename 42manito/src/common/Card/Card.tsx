import React, { ElementType } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./Card.module.css";

type ComponentProps<T extends ElementType> = T extends ElementType<infer P>
  ? P
  : never;

export interface Props<T extends ElementType, D> {
  componentProps?: ComponentProps<T>;
  data: D;
  children: React.ReactNode;
  onClick: (data: D) => void;
  className?: string;
}

/**
 1. ElementType은 React의 타입입니다. 이것은 유효한 React 컴포넌트 타입으로 사용되며 기본적인 HTML 요소와 커스텀 컴포넌트를 포함합니다.
 2. type ComponentProps<T extends ElementType>는 T 타입의 컴포넌트가 인수로 전달되는 경우, T 타입을 바탕으로 해당 컴포넌트의 속성(props) 타입을 추론하는 유틸리티 타입입니다. 이 타입은 Props 인터페이스 내에서 사용됩니다.
 3. interface Props<T extends ElementType, D>는 현 컴포넌트의 인수로 전달되는 타입에 대한 정의입니다. T는 대상 요소의 종류를 나타내고, D는 전달되는 data 객체의 타입을 나타냅니다.
  - componentProps는 T 타입의 컴포넌트가 인수로 전달되는 경우, T 타입의 속성을 받게 됩니다.
  - data는 전달되는 데이터 타입 D를 받습니다.
  - children은 자식 요소로, React에서 사용되는 노드 타입입니다.
  - onClick은 사용자가 클릭 이벤트를 처리하고자 할 때 호출하는 함수입니다. 여기서는 데이터를 전달하며 호출됩니다.
  - className은 CSS 클래스 이름을 전달할 수 있는 문자열 형태의 인자입니다.
 4. ManitoCard 함수 컴포넌트는 여러가지 요소와 데이터 타입을 인수로 받아 동적으로 활용할 수 있습니다. 이 함수는 children, data, onClick, className 속성을 받아 처리하며, 나머지 속성은 컴포넌트에 그대로 전달되어 활용됩니다. 그리고 함수 내에서 주어진 className과 기본 스타일을 twMerge 함수를 사용하여 통합한 classNameValue를 생성하여 요소에 적용합니다.
 */

export default function ManitoCard<T extends ElementType, D>({
  children,
  data,
  onClick,
  className,
  ...rest
}: Props<T, D>) {
  // 기존 className 문자열과 받은 className 속성을 통합하기 위해 twMerge를 사용합니다.
  const classNameValue = twMerge(
    styles.base,
    className === undefined ? "" : className
  );

  return (
    <section
      id="manito-card"
      {...rest}
      onClick={() => onClick(data)}
      className={classNameValue} // 통합된 className 문자열을 적용합니다.
    >
      {children}
    </section>
  );
}
