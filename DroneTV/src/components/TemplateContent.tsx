interface Props {
  html: string;
}
export default function TemplateContent({ html }: Props) {
  return {
    type: "div",
    props: { dangerouslySetInnerHTML: { __html: html } },
  } as any;
}
