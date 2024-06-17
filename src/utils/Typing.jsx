import { TypeAnimation } from 'react-type-animation';

export const TypingEffect = ({text}) => {
  return (
    <TypeAnimation
      sequence={[
       `${text}`,
        1000,
      ]}
      wrapper="span"
      speed={40}
      repeat={Infinity}
    />
  );
};