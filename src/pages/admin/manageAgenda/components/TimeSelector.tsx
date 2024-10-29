import React from "react";
import { Select, Text } from "@mantine/core";
import { format, set } from "date-fns";

interface TimeSelectorProps {
  label: string;
  date?: Date;
  onChange: (date: Date) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  date,
  onChange,
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1).map((h) => ({
    value: h.toString(),
    label: h.toString(),
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    value: i.toString().padStart(2, "0"), // Asegura que '00' se muestre como texto
    label: i.toString().padStart(2, "0"),
  }));

  const ampm = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const handleTimeChange = (
    hour: number,
    minute: number,
    ampmValue: string
  ) => {
    const adjustedHour =
      ampmValue === "PM" && hour < 12
        ? hour + 12
        : ampmValue === "AM" && hour === 12
        ? 0
        : hour;
    const updatedDate = set(date || new Date(), {
      hours: adjustedHour,
      minutes: minute,
    });
    onChange(updatedDate);
  };

  return (
    <div>
      <Text>{label}</Text>
      <Select
        label="Hora"
        data={hours}
        comboboxProps={{ zIndex: 1000 }}
        placeholder="Hora"
        value={date ? format(date, "h") : ""}
        onChange={(value) =>
          handleTimeChange(
            parseInt(value || "0"),
            date?.getMinutes() || 0,
            "AM"
          )
        }
        searchable
        clearable
      />
      <Select
        label="Minutos"
        data={minutes}
        comboboxProps={{ zIndex: 1000 }}
        placeholder="Minutos"
        value={date ? format(date, "mm") : ""}
        onChange={(value) =>
          handleTimeChange(
            date?.getHours() || 0,
            parseInt(value || "0"),
            (date?.getHours() ?? 0) >= 12 ? "PM" : "AM"
          )
        }
        searchable
        clearable
      />
      <Select
        label="AM/PM"
        data={ampm}
        comboboxProps={{ zIndex: 1000 }}
        placeholder="AM/PM"
        value={date && date.getHours() >= 12 ? "PM" : "AM"}
        onChange={(value) =>
          handleTimeChange(
            date?.getHours() || 0,
            date?.getMinutes() || 0,
            value || ""
          )
        }
        searchable
        clearable
      />
    </div>
  );
};

export default TimeSelector;