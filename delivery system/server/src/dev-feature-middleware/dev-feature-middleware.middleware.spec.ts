import { DevFeatureMiddlewareMiddleware } from './dev-feature-middleware.middleware';

describe('DevFeatureMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new DevFeatureMiddlewareMiddleware()).toBeDefined();
  });
});
