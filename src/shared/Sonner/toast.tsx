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
    toast[type || "default"](
        title,
        {
            description: description || "",
            duration: duration || 3000,
            position: position || "top-right",
            closeButton: closeButton || false,
        }
    );
}

export function ToasterContainer() {
    return <Toaster />;
}

