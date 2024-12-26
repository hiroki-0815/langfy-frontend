import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Image</h2>
      <FormDescription>
        Add an image that will be displayed on the search results. Adding a new
        image will overwrite the existing one.
      </FormDescription>
      <div className="flex flex-col items-start gap-2 md:w-[50%]">
        {existingImageUrl && (
          <img
            src={existingImageUrl}
            className="rounded-full object-cover h-[60px] w-[60px]"
          />
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <Input
                className="bg-white"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) =>
                  field.onChange(
                    event.target.files ? event.target.files[0] : null
                  )
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
