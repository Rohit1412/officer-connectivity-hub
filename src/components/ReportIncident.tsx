import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ReportForm {
  type: string;
  location: string;
  description: string;
  contact: string;
}

const ReportIncident = () => {
  const { register, handleSubmit, reset } = useForm<ReportForm>();
  const { toast } = useToast();

  const onSubmit = (data: ReportForm) => {
    console.log("Report submitted:", data);
    toast({
      title: "Report Submitted",
      description: "Thank you for your report. Authorities have been notified.",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select incident type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="suspicious">Suspicious Activity</SelectItem>
            <SelectItem value="theft">Theft</SelectItem>
            <SelectItem value="vandalism">Vandalism</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          placeholder="Location"
          {...register("location")}
        />
      </div>

      <div>
        <Textarea
          placeholder="Describe the incident..."
          {...register("description")}
          rows={4}
        />
      </div>

      <div>
        <Input
          placeholder="Contact information (optional)"
          {...register("contact")}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Report
      </Button>
    </form>
  );
};

export default ReportIncident;