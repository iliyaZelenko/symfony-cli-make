import App from '~/App.ts'
import TwigExtensionStrategy from '~/entities/twig/extensions/TwigExtensionStrategy'

new App(
  new TwigExtensionStrategy()
).execute()

