"use client";

import { Steps } from "astralis-ui";

export function StepsVertical() {
  return (
    <Steps orientation="vertical" defaultStep={2}>
      <Steps.List>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Title>Repository created</Steps.Title>
          <Steps.Description>astralis/astralis-ui</Steps.Description>
        </Steps.Item>
        <Steps.Item error>
          <Steps.Indicator />
          <Steps.Title>CI failed</Steps.Title>
          <Steps.Description>error marks a step red</Steps.Description>
        </Steps.Item>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Title>Fix and re-run</Steps.Title>
          <Steps.Description>You are here</Steps.Description>
        </Steps.Item>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Title>Deploy</Steps.Title>
          <Steps.Description>Upcoming</Steps.Description>
        </Steps.Item>
      </Steps.List>
    </Steps>
  );
}
