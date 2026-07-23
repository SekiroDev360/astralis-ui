"use client";

import { Stat, HStack } from "astralis-ui";

export function StatDemo() {
  return (
    <HStack gap="10" wrap="wrap" justifyContent="center">
      <Stat>
        <Stat.Label>Total users</Stat.Label>
        <Stat.Value>24,521</Stat.Value>
        <Stat.HelpText>
          <Stat.Indicator type="increase">12.4%</Stat.Indicator> from last month
        </Stat.HelpText>
      </Stat>
      <Stat>
        <Stat.Label>Bounce rate</Stat.Label>
        <Stat.Value>18.2%</Stat.Value>
        <Stat.HelpText>
          <Stat.Indicator type="decrease">3.1%</Stat.Indicator> from last month
        </Stat.HelpText>
      </Stat>
    </HStack>
  );
}
