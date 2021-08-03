function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="23B7FP"
          clientSecret="6900e27b234bb9eabdc52211c40c588d"
          scope="nutrition"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
