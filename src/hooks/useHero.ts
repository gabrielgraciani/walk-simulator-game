import { useEffect, useState } from 'react';

import { DirectionsEnum } from '../enum/Directions';

import { IDirections } from '../interfaces/Directions';

import { randomNumber } from '../utils/helper';
import { attackDurationMS, heroInitialLife } from '../config/Constants';

interface IUseHeroResponse {
  positionHorizontal: number;
  positionVertical: number;
  direction: IDirections;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  moveUp: () => void;
  handleAttack: () => void;
  isAttacking: boolean;
  isBlocked: boolean;
  isDead: boolean;
  life: number;
  handleReceiveDamage: () => void;
}

export const useHero = (): IUseHeroResponse => {
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState<IDirections>(DirectionsEnum.DOWN);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  // TODO remove this eslint disable rule when i make the death function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDead, setIsDead] = useState(false);
  const [life, setLife] = useState(heroInitialLife);

  function moveLeft() {
    setDirection(DirectionsEnum.LEFT);
    setPosition(pos => ({
      x: pos.x - 1,
      y: pos.y,
    }));
  }

  function moveRight() {
    setDirection(DirectionsEnum.RIGHT);
    setPosition(pos => ({
      x: pos.x + 1,
      y: pos.y,
    }));
  }

  function moveDown() {
    setDirection(DirectionsEnum.DOWN);
    setPosition(pos => ({
      x: pos.x,
      y: pos.y + 1,
    }));
  }

  function moveUp() {
    setDirection(DirectionsEnum.UP);
    setPosition(pos => ({
      x: pos.x,
      y: pos.y - 1,
    }));
  }

  function handleAttack() {
    setIsAttacking(true);
    setIsBlocked(true);
  }

  function handleReceiveDamage() {
    const randomDamage = randomNumber(1, 50);

    setLife(oldLife => {
      const result = oldLife - randomDamage;
      if (result <= 0) {
        setIsDead(true);
        setIsBlocked(true);
        return 0;
      }

      return result;
    });
  }

  useEffect(() => {
    if (isAttacking) {
      setTimeout(() => {
        setIsAttacking(false);
        setIsBlocked(false);
      }, attackDurationMS);
    }
  }, [isAttacking]);

  return {
    positionHorizontal: position.x,
    positionVertical: position.y,
    direction,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
    handleAttack,
    isAttacking,
    isBlocked,
    isDead,
    life,
    handleReceiveDamage,
  };
};
