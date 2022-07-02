import { ActionFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Background from '~/components/Background';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import textState, { charCountState } from '~/recoil/example';
import { getColorScheme, colorSchemeCookie } from '~/services/cookies';
import { lightTheme, darkTheme } from '~/themes';

export const action: ActionFunction = async ({ request }) => {
  const currentColorScheme = await getColorScheme(request);
  const newColorScheme =
    currentColorScheme === lightTheme.className
      ? darkTheme.className
      : lightTheme.className;

  return redirect(request.url, {
    headers: {
      'Set-Cookie': await colorSchemeCookie.serialize(newColorScheme),
    },
  });
};

export default function Index() {
  const [text] = useRecoilState(textState);
  const charCount = useRecoilValue(charCountState);

  return (
    <Background
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <p>{text}</p>
      <p>{charCount}</p>
      <ThemeSwitcher />
    </Background>
  );
}
