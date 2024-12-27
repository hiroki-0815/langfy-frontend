"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
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

import ImageSection from "./ImageSection";
import { User } from "@/model/types";
import {
  FLUENCY_LEVELS,
  GENDERS,
  LANGUAGES,
  MOTIVATIONS,
  NATIONALITIES,
} from "@/model/constants";

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name." }),
    gender: z.enum(GENDERS, {
      message: "Please select your gender (male or female).",
    }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .optional(),
    city: z.string().min(1, { message: "City name is required." }),
    country: z.string().min(1, { message: "Please provide your country." }),
    nationality: z.enum(NATIONALITIES, {
      message: "Choose a valid nationality.",
    }),
    nativeLanguage: z.enum(LANGUAGES, {
      message: "Select your native language.",
    }),
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
      .refine((val) => val > 0, { message: "Age must be a positive number." }),
    learningLanguage: z.enum(LANGUAGES, {
      message: "Please select a language you are learning.",
    }),
    fluencyLevel: z.enum(FLUENCY_LEVELS, {
      message: "Please choose your fluency level.",
    }),
    motivation: z.enum(MOTIVATIONS, { message: "Tell us what motivates you." }),
    selfIntroduction: z
      .string()
      .min(1, { message: "Please provide a brief self-introduction." }),
    imageUrl: z
      .string()
      .url({ message: "Enter a valid image URL." })
      .optional(),
    imageFile: z
      .instanceof(File, { message: "Please upload a valid image file." })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "You need to either provide an image URL or upload a file.",
    path: ["imageFile"],
  });

type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: FormData) => Promise<User>;
  isLoading: boolean;
  currentUser: User;
};

const UserProfileForm: React.FC<Props> = ({
  onSave,
  isLoading,
  currentUser,
}) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...currentUser,
      imageFile: undefined, // Files should not have default values
    },
  });

  useEffect(() => {
    form.reset({
      ...currentUser,
      imageFile: undefined, // Ensure imageFile is cleared when resetting
    });
  }, [currentUser, form]);

  const onSubmit = async (formDataJson: UserFormData) => {
    console.log("Form Submitted:", formDataJson);
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
      formData.append("imageFile", formDataJson.imageFile);
    }

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  return (
    <FormProvider {...form}>
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
            {/* Name Field */}
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
            {/* Gender Field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
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
            {/* Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      className="bg-white"
                      placeholder="Enter your age"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-gray-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* City Field */}
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
            {/* Country Field */}
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
            {/* Nationality Field */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
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
            {/* Native Language Field */}
            <FormField
              control={form.control}
              name="nativeLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Native Language</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
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
            {/* Learning Language Field */}
            <FormField
              control={form.control}
              name="learningLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Language</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
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
            {/* Fluency Level Field */}
            <FormField
              control={form.control}
              name="fluencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fluency Level</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
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
            {/* Motivation Field */}
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
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
          {/* Self Introduction Field */}
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
                    placeholder="Introduce yourself..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image Section */}
          <ImageSection />
          {/* Submit Button */}
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="bg-blue-400">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </FormProvider>
  );
};

export default UserProfileForm;
