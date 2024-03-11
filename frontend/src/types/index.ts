import { SyntheticEvent } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      primaryTextColor: string;
      secondaryTextColor: string;
    };
  }
}

export interface TableAction {
  onClick: (event: SyntheticEvent, item: Record<string, any>) => void;
  className: string;
  title: string;
  icon: React.ReactNode;
}

export type TableActionArray = TableAction[];
