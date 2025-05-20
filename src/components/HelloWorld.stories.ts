//This file tells Storybook how to display your component for testing/preview.

//Meta and StoryObj are TS types.Meta describes the component and settings(Meta details).
//StoryObj describes each version of the component.
import type { Meta, StoryObj } from "@storybook/web-components";
import "./HelloWorld"; //makes sure your component is loaded.

//'meta' variable holds config info.
const meta: Meta = {
  title: "Example/HelloWorld", //Title is how the story appears in Storybook sidebar.
  component: "hello-world", //this is the name of the custom element you created.
  tags: ["autodocs"], //this lets Storybook auto-document the component.
};

export default meta; //sends the config to Storybook
type Story = StoryObj; //Shortcut for declaring stories.

//Default is a version of your component
export const Default: Story = {};
