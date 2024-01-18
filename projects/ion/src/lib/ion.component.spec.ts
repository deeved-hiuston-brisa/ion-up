import { IonComponent } from './ion.component';
import { render } from '@testing-library/angular';

describe('Test with @testing-libray', () => {
  it('should to render IonComponent', async () => {
    await render(IonComponent);
    expect(true).toBeTruthy();
  });
});
