import { ComponentType } from 'react';

import { BookIcon, ChartIcon } from '@/components/icons/HomeIcons';
import { appRoutes } from './appRoutes';

export type Stat = {
  value: string;
  label: string;
};

export type Feature = {
  Icon: ComponentType;
  title: string;
  description: string;
  href: string | null;
};

export const STATS: Stat[] = [
  { value: '24+', label: 'Экспериментов' },
  { value: '9+', label: 'Метрик' },
  { value: '35+', label: 'Определений' },
  { value: '2', label: 'Раздела' },
];

export const FEATURES: Feature[] = [
  {
    Icon: ChartIcon,
    title: 'Визуализация метрик',
    description:
      'Графическое отображение экспериментальных данных для анализа производительности системы.',
    href: null,
  },
  {
    Icon: BookIcon,
    title: 'Глоссарий',
    description:
      'Структурированный справочник терминов и определений предметной области с граф-навигацией между понятиями.',
    href: appRoutes.keywords,
  },
];
