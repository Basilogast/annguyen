import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '4lxuglib',
    dataset: 'production'
  },
  studioHost: 'thienanport', // Add this line to define your hostname
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
});
