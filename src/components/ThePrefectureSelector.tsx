import * as React from "react";

export type Prefecture = {
  code: string;
  name: string;
};
export type PrefectureCheckedState = Record<Prefecture["code"], boolean>;
export type Props = {
  prefectures: Readonly<Prefecture[]>;
  /**  a dictionary of prefectureCode -> checked */
  checked: Readonly<PrefectureCheckedState>;
  onChange: (checked: PrefectureCheckedState) => Promise<void> | void;
};

export default function ThePrefectureSelector({
  prefectures,
  checked,
  onChange,
}: Props) {
  return (
    <section>
      <h2>都道府県</h2>
      {prefectures.map(({ code, name }) => (
        <span key={code}>
          <label>
            <input
              type="checkbox"
              checked={checked[code] ?? false}
              onChange={() =>
                onChange({
                  ...checked,
                  [code]: !checked[code],
                })
              }
            />
            {name}
          </label>
        </span>
      ))}
    </section>
  );
}
