import { useState } from "react";

interface EventDescriptionProps {
    html: string;
    initialLines?: number; // How many lines to show before "Læs mere"
}

const EventDescription: React.FC<EventDescriptionProps> = ({ html, initialLines = 3 }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div
                className="prose max-w-full overflow-hidden text-white"
                style={
                    !expanded
                        ? {
                            display: "-webkit-box",
                            WebkitLineClamp: initialLines,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }
                        : {}
                }
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <button
                className="mt-2 hover:underline font-medium"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? "Vis mindre" : "Læs mere"}
            </button>
        </div>
    );
};

export default EventDescription;
