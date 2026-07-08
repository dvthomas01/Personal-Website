import type { Skill } from './types';
import python from '../assets/skills/python-logo.png';
import arduino from '../assets/skills/arduino-logo.svg';
import javascript from '../assets/skills/javascript-logo.svg';
import html from '../assets/skills/html-logo.svg';
import css from '../assets/skills/css-logo.png';
import react from '../assets/skills/react-logo.png';
import express from '../assets/skills/express_logo.png';
import node from '../assets/skills/node-logo.png';
import ros from '../assets/skills/ros2-logo.png';
import flask from '../assets/skills/flask-logo.png';
import mysql from '../assets/skills/mysql-logo.svg';
import pytorch from '../assets/skills/pytorch.png';
import docker from '../assets/skills/docker.png';
import fusion from '../assets/skills/fusion.png';
import mujoco from '../assets/skills/mujoco.jpeg';
import solidworks from '../assets/skills/solidworks.jpg';

export const skills: Skill[] = [
  { name: 'Python', icon: python },
  { name: 'Arduino', icon: arduino },
  { name: 'JavaScript', icon: javascript },
  { name: 'HTML', icon: html },
  { name: 'CSS', icon: css },
  { name: 'React', icon: react },
  { name: 'Express.js', icon: express },
  { name: 'Node.js', icon: node },
  { name: 'ROS', icon: ros },
  { name: 'Flask', icon: flask },
  { name: 'MySQL', icon: mysql },
  { name: 'PyTorch', icon: pytorch },
  { name: 'Docker', icon: docker },
  { name: 'Fusion 360', icon: fusion },
  { name: 'MuJoCo', icon: mujoco },
  { name: 'SolidWorks', icon: solidworks },
];
