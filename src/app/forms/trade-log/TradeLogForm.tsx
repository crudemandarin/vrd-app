import React from "react";

import { useForm, Controller } from "react-hook-form";

import {
  TradeLogFormModel,
  TradeLogFormDefaults,
  TradeLogNames
} from "./TradeLog";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const TradeLogForm = () => {
  const { formState, handleSubmit, reset, control } =
    useForm<TradeLogFormModel>({
      defaultValues: TradeLogFormDefaults
    });
  const { errors, isSubmitting } = formState;

  const onSubmit = (data: TradeLogFormModel) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Deal Date</label>
        <div>
          <Controller
            name="dealDate"
            control={control}
            render={({ field }) => (
              <InputText {...field} placeholder="Deal Date" />
            )}
          />
        </div>
        <small className="p-error block">{errors?.dealDate?.message}</small>
      </div>
      <div>
        <label>Commodity</label>
        <div>
          <Controller
            name="commodity"
            control={control}
            render={({ field }) => (
              <InputText {...field} placeholder="Commodity" />
            )}
          />
        </div>
        <small className="p-error block">{errors?.commodity?.message}</small>
      </div>

      <Button label="Submit" type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default TradeLogForm;
