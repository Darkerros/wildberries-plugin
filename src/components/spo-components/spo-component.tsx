import React, {FC} from 'react';
import './spo-component.css'

interface SpoComponentProps {
  spoPercentage: string | number;
  beforeSpoPrice: number;
}

const SpoComponent: FC<SpoComponentProps> = ({spoPercentage, beforeSpoPrice}) => {
  return (
    <div className="spo-component">
      <p className="spo-component__text">
        <span className="spo-component__text-element-title">
          СПП:<b className="spo-component__text-element-content">{spoPercentage}%</b>
        </span>
        <span className="spo-component__text-element-title">
          До СПП:<b className="spo-component__text-element-content">{beforeSpoPrice}₽</b>
        </span>
      </p>
    </div>
  );
};

export default SpoComponent;
