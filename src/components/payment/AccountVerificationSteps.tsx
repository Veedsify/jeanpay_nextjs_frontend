"use client";
import { useState, useEffect, useRef } from "react";
import { Check, Clock, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AccountDetails,
  useSetAccountDetails,
  useSetTransferDetails,
} from "../contexts/TransferStore";
import { validateAccountNumber } from "@/funcs/paystack/paystack";

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "loading" | "completed" | "error";
  duration?: number;
}

interface AccountVerificationStepsProps {
  steps: VerificationStep[];
  accountDetails: AccountDetails;
  onComplete: () => void;
  onError: (stepId: string, error: string) => void;
}

export default function AccountVerificationSteps({
  steps: initialSteps,
  onComplete,
  accountDetails,
  onError,
}: AccountVerificationStepsProps) {
  const [steps, setSteps] = useState<VerificationStep[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const setAccountdetails = useSetAccountDetails();
  const setTransferdetails = useSetTransferDetails();
  const processingRef = useRef(false);
  const stepsRef = useRef(steps);

  // Keep the ref in sync with state
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    // Don't process if we've completed all steps
    if (currentStepIndex >= stepsRef.current.length) {
      return;
    }

    const currentStep = stepsRef.current[currentStepIndex];

    if (currentStep?.status === "pending" && !processingRef.current) {
      processingRef.current = true;

      // Start loading the current step
      setSteps((prev) =>
        prev.map((step, index) =>
          index === currentStepIndex
            ? { ...step, status: "loading" as const }
            : step,
        ),
      );

      // Simulate verification process
      const timeoutId = setTimeout(async () => {
        let success = false;
        let errorMessage = "";

        try {
          // Steps 0 and 1 are format validation steps that should succeed automatically
          if (currentStepIndex === 0 || currentStepIndex === 1) {
            success = true;
          }
          // Step 2 is the actual API validation step
          else if (accountDetails.type === "bank" && currentStepIndex === 2) {
            const validateDetails = await validateAccountNumber(
              accountDetails.accountNumber!,
              accountDetails.bankCode!,
            );
            if (validateDetails.status) {
              setAccountdetails({
                accountNumber: validateDetails.data.account_number,
                recipientName: validateDetails.data.account_name,
              });
              setTransferdetails({
                recipientName: validateDetails.data.account_name,
              });
              success = true;
            } else {
              success = false;
              errorMessage =
                validateDetails.data?.message ||
                validateDetails.message ||
                "Account validation failed";
            }
          } else if (accountDetails.type === "momo" && currentStepIndex === 2) {
            const validateDetails = await validateAccountNumber(
              accountDetails.phoneNumber!,
              "MTN",
            );

            if (validateDetails.status) {
              setAccountdetails({
                phoneNumber: validateDetails.data.account_number,
                recipientName: validateDetails.data.account_name,
              });
              setTransferdetails({
                recipientName: validateDetails.data.account_name,
              });
              success = true;
            } else {
              success = false;
              errorMessage =
                validateDetails.data?.message ||
                validateDetails.message ||
                "Mobile money validation failed";
            }
          }
          // Steps 3+ are also format steps that should succeed automatically
          else {
            success = true;
          }
        } catch (error: unknown) {
          success = false;
          errorMessage =
            (
              error as {
                response?: { data?: { message?: string } };
                message?: string;
              }
            ).response?.data?.message ||
            (error as { message?: string }).message ||
            "Network error occurred";
        }

        if (success) {
          setSteps((prev) =>
            prev.map((step, index) =>
              index === currentStepIndex
                ? { ...step, status: "completed" as const }
                : step,
            ),
          );

          // Move to next step after a brief delay
          setTimeout(() => {
            processingRef.current = false;
            const nextStepIndex = currentStepIndex + 1;
            // Check if we've completed all steps
            if (nextStepIndex >= stepsRef.current.length) {
              onComplete?.();
            } else {
              setCurrentStepIndex(nextStepIndex);
            }
          }, 500);

          return;
        } else {
          setSteps((prev) =>
            prev.map((step, index) =>
              index === currentStepIndex
                ? { ...step, status: "error" as const }
                : step,
            ),
          );

          processingRef.current = false;
          onError?.(
            currentStep.id,
            errorMessage || `Failed to ${currentStep.title.toLowerCase()}`,
          );
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        processingRef.current = false;
      };
    }
  }, [
    currentStepIndex,
    onComplete,
    onError,
    accountDetails,
    setAccountdetails,
    setTransferdetails,
  ]);

  const getStepIcon = (step: VerificationStep, index: number) => {
    switch (step.status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-600" />;
      case "loading":
        return <Loader2 className="w-5 h-5 text-jean-orange animate-spin" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <span className="text-xs text-gray-600">{index + 1}</span>
          </div>
        );
    }
  };

  const getStepColors = (step: VerificationStep) => {
    switch (step.status) {
      case "completed":
        return {
          container: "border-green-200",
          title: "text-green-900",
          description: "text-green-700",
        };
      case "loading":
        return {
          container: " border-cyan-200",
          title: "text-black",
          description: "text-black/70",
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200",
          title: "text-red-900",
          description: "text-red-700",
        };
      default:
        return {
          container: "border-gray-200",
          title: "text-black",
          description: "text-black/70",
        };
    }
  };

  const isAllCompleted = steps.every((step) => step.status === "completed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Account Verification
        </h3>
        <div className="text-sm text-gray-600">
          {steps.filter((s) => s.status === "completed").length} of{" "}
          {steps.length} completed
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const colors = getStepColors(step);
          const isActive =
            index === currentStepIndex && step.status === "loading";
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                colors.container
              } ${isActive ? "ring-2 ring-jean-orange ring-opacity-50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.status}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getStepIcon(step, index)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${colors.title}`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm mt-1 ${colors.description}`}>
                    {step.description}
                  </p>

                  {step.status === "loading" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2"
                    >
                      <div className="w-full bg-jean-orange rounded-full h-1">
                        <motion.div
                          className="bg-jean-orange h-1 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: (step.duration || 2000) / 1000,
                            ease: "linear",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step.status === "error" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 space-x-3"
                    >
                      <button
                        onClick={() => {
                          setSteps((prev) =>
                            prev.map((s, i) =>
                              i === index ? { ...s, status: "pending" } : s,
                            ),
                          );
                          setCurrentStepIndex(index);
                          processingRef.current = false;
                        }}
                        className="text-sm text-red-700 hover:text-red-800 underline"
                      >
                        Retry this step
                      </button>
                    </motion.div>
                  )}
                </div>

                {step.status === "loading" && (
                  <div className="flex-shrink-0">
                    <Clock className="w-4 h-4 text-cyan-dark" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {isAllCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
        >
          <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-medium text-green-900">Verification Complete!</h4>
          <p className="text-sm text-green-700 mt-1">
            All verification steps have been completed successfully.
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Helper function to create verification steps for different scenarios
export const createAccountVerificationSteps = (
  accountType: "bank" | "momo",
  accountDetails: {
    bankName?: string;
    accountNumber?: string;
    phoneNumber?: string;
    network?: string;
  },
): VerificationStep[] => {
  const baseSteps = [
    {
      id: "validate_format",
      title: "Validating Account Format",
      description: "Checking if the account details are in the correct format",
      status: "pending" as const,
      duration: 300,
    },
  ];

  if (accountType === "bank") {
    return [
      ...baseSteps,
      {
        id: "verify_bank",
        title: "Verifying Bank Details",
        description: `Confirming ${accountDetails.bankName} bank information`,
        status: "pending" as const,
        duration: 300,
      },
      {
        id: "verify_account",
        title: "Verifying Account Number",
        description: `Checking account ${accountDetails.accountNumber}`,
        status: "pending" as const,
        duration: 300,
      },
      {
        id: "fetch_name",
        title: "Fetching Account Name",
        description: "Retrieving the account holder's name",
        status: "pending" as const,
        duration: 300,
      },
    ];
  } else {
    return [
      ...baseSteps,
      {
        id: "verify_network",
        title: "Verifying Mobile Network",
        description: `Confirming ${accountDetails.network} network connectivity`,
        status: "pending" as const,
        duration: 300,
      },
      {
        id: "verify_number",
        title: "Verifying Phone Number",
        description: `Checking mobile money account ${accountDetails.phoneNumber}`,
        status: "pending" as const,
        duration: 300,
      },
      {
        id: "check_status",
        title: "Checking Account Status",
        description: "Verifying if the mobile money account is active",
        status: "pending" as const,
        duration: 300,
      },
    ];
  }
};
