import { Intly, AbstractDictionary } from 'intly';
import * as React from 'react';

export interface Props {
  children: React.ReactNode;
}

// NOTE: this declaration is needed to avoid typescript's compile error (TS4094)
// https://github.com/microsoft/TypeScript/issues/30355
class IntlyHandler extends React.PureComponent<Props> {}

export function createIntlyHandler<T extends AbstractDictionary>(intly: Intly<T>): typeof IntlyHandler {
  return class extends IntlyHandler {
    public componentDidMount() {
      intly.on('languageChanged', this.handleLanguageChanged);
    }

    public componentWillUnmount() {
      intly.off('languageChanged', this.handleLanguageChanged);
    }

    public render() {
      return <React.Fragment key={intly.getLanguage()}>{this.props.children}</React.Fragment>;
    }

    private handleLanguageChanged = () => {
      this.forceUpdate();
    }
  };
}
