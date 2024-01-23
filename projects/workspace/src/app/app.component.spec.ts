import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should', async () => {
    await render(AppComponent);
    screen.debug();
    expect(true).toBeTruthy();
  });
});
