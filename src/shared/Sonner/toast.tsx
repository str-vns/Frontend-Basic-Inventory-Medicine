import React from "react"
import { toast, Toaster } from "sonner";

interface ToasterProps {
    title: string;
    description?: string;
    duration?: number;
    closeButton?: boolean;
    type?: "default" | "success" | "error" | "warning" | "info";
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function showToast({ title, description, duration, type, position, closeButton }: ToasterProps): void {
    const toastOptions = {
        description: description || "",
        duration: duration || 3000,
        position: position || "top-right",
        closeButton: closeButton || false,
    };

    switch (type) {
        case "success":
            toast.success(title, toastOptions);
            break;
        case "error":
            toast.error(title, toastOptions);
            break;
        case "warning":
            toast.warning(title, toastOptions);
            break;
        case "info":
            toast.info(title, toastOptions);
            break;
        default:
            toast(title, toastOptions);
            break;
    }
}

export function ToasterContainer() {
    return <Toaster />;
}

