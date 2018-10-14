import { Intly, AbstractDictionary } from 'intly';
import * as React from 'react';

export interface Props {
  children: React.ReactNode;
}

export function createIntlyHandler<T extends AbstractDictionary>(intly: Intly<T>) {
  return class IntlyHandler extends React.PureComponent<Props> {
    public constructor(props: Props) {
      super(props);

      intly.on('languageChanged', () => {
        this.forceUpdate();
      });
    }

    public render() {
      return <React.Fragment key={intly.getLanguage()}>{this.props.children}</React.Fragment>;
    }
  };
}
