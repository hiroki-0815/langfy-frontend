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
import { User } from "@/model/types";
import {
  GENDERS,
  NATIONALITIES,
  LANGUAGES,
  FLUENCY_LEVELS,
  MOTIVATIONS,
} from "@/model/constants";
import { useEffect } from "react";
import ImageSection from "./ImageSection";

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    gender: z.enum(GENDERS, {
      message: "Gender must be either 'male' or 'female'.",
    }),
    email: z.string().optional(),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    nationality: z.enum(NATIONALITIES, { message: "Invalid nationality." }),
    nativeLanguage: z.enum(LANGUAGES, { message: "Invalid native language." }),
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
      .refine((val) => val > 0, { message: "Age must be a positive number." }),
    learningLanguage: z.enum(LANGUAGES, {
      message: "Invalid learning language.",
    }),
    fluencyLevel: z.enum(FLUENCY_LEVELS, { message: "Invalid fluency level." }),
    motivation: z.enum(MOTIVATIONS, { message: "Invalid motivation." }),
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
    formData.append("nativeLanguage", formDataJson.nativeLanguage);
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    {GENDERS.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {NATIONALITIES.map((nationality) => (
                      <SelectItem key={nationality} value={nationality}>
                        {nationality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="nativeLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Native Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your native language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="learningLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your learning language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    {FLUENCY_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
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
                    {MOTIVATIONS.map((motivation) => (
                      <SelectItem key={motivation} value={motivation}>
                        {motivation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
