"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types";
import { useEffect } from "react";
import ImageSection from "./ImageSection";

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    gender: z.enum(["male", "female"], {
      message: "Gender must be either 'male' or 'female'.",
    }),
    email: z.string().optional(),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    nationality: z.string().min(1, { message: "Nationality is required." }),
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
      .refine((val) => val > 0, { message: "Age must be a positive number." }),
    learningLanguage: z
      .string()
      .min(1, { message: "Learning language is required." }),
    fluencyLevel: z.enum(["beginner", "intermediate", "advanced"], {
      message:
        "Fluency level must be 'beginner', 'intermediate', or 'advanced'.",
    }),
    motivation: z.enum(["wanna chat", "wanna call"], {
      message: "Motivation must be 'wanna chat' or 'wanna call'.",
    }),
    selfIntroduction: z
      .string()
      .min(1, { message: "Self-introduction is required." }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be required",
    path: ["imageFile"],
  });

type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: FormData) => void;
  isLoading: boolean;
  currentUser: User;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  const onSubmit = (formDataJson: UserFormData) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    if (formDataJson.email) formData.append("email", formDataJson.email);
    formData.append("city", formDataJson.city);
    formData.append("gender", formDataJson.gender);
    formData.append("country", formDataJson.country);
    formData.append("nationality", formDataJson.nationality);
    formData.append("age", formDataJson.age.toString());
    formData.append("learningLanguage", formDataJson.learningLanguage);
    formData.append("fluencyLevel", formDataJson.fluencyLevel);
    formData.append("motivation", formDataJson.motivation);
    formData.append("selfIntroduction", formDataJson.selfIntroduction);
    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-gray-50 rounded-lg p-4 md:p-10"
      >
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Details</h2>
          <FormDescription>Enter the details about yourself</FormDescription>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="learningLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Language</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fluencyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fluency Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your fluency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your motivation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wanna chat">Wanna Chat</SelectItem>
                    <SelectItem value="wanna call">Wanna Call</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selfIntroduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Self Introduction</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="bg-white block w-full p-2 border rounded"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-blue-400">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
