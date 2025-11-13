import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BTCDominanceAlertForm from "../components/BTCDominanceAlertForm/BTCDominanceAlertForm";
import "@testing-library/jest-dom";
import React from "react";

// Mock use-debounce to avoid actual debouncing in tests
jest.mock('use-debounce', () => ({
  useDebouncedCallback: (callback: (...args: any[]) => void, delay: number) => {
    const ref = React.useRef(callback);
    React.useEffect(() => { ref.current = callback; }, [callback]);
    return React.useCallback((...args: any[]) => {
      ref.current(...args);
    }, []);
  },
}));

const mockChannels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord", value: "discord" },
  { label: "Email", value: "email" },
];

const mockDirections = [
  { label: "rises above", value: "rises_above" },
  { label: "drops below", value: "drops_below" },
];

const initialFormState = {
  channel: "webhook",
  discordBot: "",
  webhook: "https://example.com/webhook",
  direction: "rises_above",
  level: "50",
};

const setup = (
  formState = initialFormState,
  handleChange = jest.fn(),
  handleSubmit = jest.fn(),
  isLoading = false,
  error = null,
  btcDominance = "45.67"
) => {
  render(
    <BTCDominanceAlertForm
      form={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      channels={mockChannels}
      directions={mockDirections}
      btcDominance={btcDominance}
      isLoading={isLoading}
      error={error}
      debounceTime={0} // Set debounceTime to 0 for immediate updates in tests
    />
  );
};

describe("BTCDominanceAlertForm", () => {
  it("renders correctly with initial form state", () => {
    setup();
    expect(screen.getByLabelText(/send me a/i)).toHaveValue("webhook");
    expect(screen.getByPlaceholderText(/https:\/\/webhook.site\//i)).toHaveValue("https://example.com/webhook");
    expect(screen.getByText(/when the Bitcoin dominance level/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("rises above")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
    expect(screen.getByText(/btc dominance is currently 45.67%/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set alert/i })).toBeInTheDocument();
  });

  it("calls handleChange when channel is changed", () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    fireEvent.change(screen.getByLabelText(/send me a/i), {
      target: { value: "discord" },
    });

    expect(handleChange).toHaveBeenCalledWith("channel");
  });

  it("calls handleChange when webhook URL is changed", () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    const webhookInput = screen.getByPlaceholderText(/https:\/\/webhook.site\//i);
    fireEvent.change(webhookInput, { target: { value: "https://new.webhook.com" } });

    expect(handleChange).toHaveBeenCalledWith("webhook");
  });

  it("calls handleChange when direction is changed", () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    fireEvent.change(screen.getByDisplayValue("rises above"), {
      target: { value: "drops_below" },
    });

    expect(handleChange).toHaveBeenCalledWith("direction");
  });

  it("calls handleChange when level is changed (debounced)", async () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    const levelInput = screen.getByDisplayValue("50");
    fireEvent.change(levelInput, { target: { value: "60" } });

    // Since debounceTime is 0 in setup, the change should be immediate
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("level");
    });
  });

  it("conditionally renders Discord Bot Token field when channel is Discord", () => {
    const discordFormState = { ...initialFormState, channel: "discord" };
    setup(discordFormState);

    expect(screen.getByLabelText(/discord bot token/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/webhook url/i)).not.toBeInTheDocument();
  });

  it("conditionally renders Webhook URL field when channel is Webhook", () => {
    const webhookFormState = { ...initialFormState, channel: "webhook" };
    setup(webhookFormState);

    expect(screen.getByLabelText(/webhook url/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/discord bot token/i)).not.toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", () => {
    const handleSubmit = jest.fn();
    setup(initialFormState, jest.fn(() => () => {}), handleSubmit);

    fireEvent.submit(screen.getByRole("form"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables the submit button and shows spinner when isLoading is true", () => {
    setup(initialFormState, jest.fn(() => () => {}), jest.fn(), true);

    const submitButton = screen.getByRole("button", { name: /set alert/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toBeInTheDocument(); // Spinner has role="status"
  });

  it("displays an error message when error prop is provided", () => {
    const errorMessage = "Something went wrong!";
    setup(initialFormState, jest.fn(() => () => {}), jest.fn(), false, errorMessage);

    expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    expect(screen.getByText(errorMessage)).toHaveClass("text-red-500");
  });

  it("ensures level input has min and max attributes", () => {
    setup();
    const levelInput = screen.getByDisplayValue("50");
    expect(levelInput).toHaveAttribute("min", "0");
    expect(levelInput).toHaveAttribute("max", "100");
    expect(levelInput).toHaveAttribute("step", "0.01");
  });
});
