function Container({ as: Element = "div", className = "", children }) {
  return (
    <Element className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className}`}>
      {children}
    </Element>
  );
}

export default Container;
