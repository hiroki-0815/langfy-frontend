import React from "react";

type ActionButtonCareDropDownProps = {
  deviceList: MediaDeviceInfo[];
  defaultValue: string;
  onChangeDevice: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: "audio" | "video";
};

const ActionButtonCareDropDown = ({
  deviceList,
  defaultValue,
  onChangeDevice,
  type,
}: ActionButtonCareDropDownProps) => {
  let dropDownContent;

  if (type === "video") {
    dropDownContent = deviceList.map((vd) => (
      <option key={vd.deviceId} value={vd.deviceId}>
        {vd.label}
      </option>
    ));
  } else if (type === "audio") {
    const audioInputEl = [];
    const audioOutputEl = [];
    deviceList.forEach((d) => {
      if (d.kind === "audioinput") {
        audioInputEl.push(
          <option key={`input${d.deviceId}`} value={`input${d.deviceId}`}>
            {d.label}
          </option>
        );
      } else if (d.kind === "audiooutput") {
        audioOutputEl.push(
          <option key={`ouput${d.deviceId}`} value={`ouput${d.deviceId}`}>
            {d.label}
          </option>
        );
      }
    });
    audioInputEl.unshift(<optgroup label="Input Devices" />);
    audioOutputEl.unshift(<optgroup label="Output Devices" />);
    dropDownContent = audioInputEl.concat(audioOutputEl);
  }

  return (
    <div
      className="absolute bottom-20 left-10 rounded-md p-2 z-10 bg-gray-700"
      style={{ top: "-50px" }}
    >
      <select
        defaultValue={defaultValue}
        onChange={onChangeDevice}
        className="bg-gray-800 text-white p-1 rounded"
      >
        {dropDownContent}
      </select>
    </div>
  );
};

export default ActionButtonCareDropDown;
