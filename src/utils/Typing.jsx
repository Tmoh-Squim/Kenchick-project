import { TypeAnimation } from 'react-type-animation';

export const TypingEffect = ({text}) => {
  return (
    <TypeAnimation
      sequence={[
       `${text}`,
      ]}
      wrapper="span"
      speed={50}
      repeat={false}
    />
  );
};