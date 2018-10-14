export interface NumberFormatArgs {
  language?: string | string[];
  count: number;
}

export interface NumberFormatOptions extends Intl.NumberFormatOptions {
  replacement?: { [count: number]: string };
}

export class NumberFormatter {
  private tpl: string;
  private options: NumberFormatOptions;

  public constructor(tpl: string, options: NumberFormatOptions) {
    this.tpl = tpl;
    this.options = options;
  }

  public format({ language, count }: NumberFormatArgs): string {
    const { replacement, ...rest } = this.options;
    const formatter = new Intl.NumberFormat(language, rest);

    // TODO: implement common interpolation func (`{{key}}`)

    return (replacement != null && replacement[count] != null ? replacement[count] : this.tpl).replace(
      '{{count}}',
      formatter.format(count),
    );
  }
}

export function nf(tpl: string, options: NumberFormatOptions = {}): NumberFormatter {
  return new NumberFormatter(tpl, options);
}
