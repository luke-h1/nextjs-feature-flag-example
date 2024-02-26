import Redis from "ioredis";

class FlagService {
  private redis: Redis;

  constructor() {
    this.redis = this.getRedisInstance();
  }

  private createRedisInstance() {
    return new Redis(process.env.REDIS_URL);
  }

  private buildFlagKey(key: string) {
    return `flag:${key}`;
  }

  private getRedisInstance() {
    if (!this.redis) {
      this.redis = this.createRedisInstance();
    }
    return this.redis;
  }

  /**
   * enables a feature flag
   * @param key
   * @returns void
   */
  public async enableFlag(key: string): Promise<void> {
    // filter out any duplicate keys, and set flag to true
    await this.redis
      .multi()
      .sadd("flags", key)
      .set(this.buildFlagKey(key), "1")
      .exec();
  }

  /**
   * disables a feature flag
   * @param key
   * @returns void
   */
  public async disableFlag(key: string): Promise<void> {
    await this.redis.set(this.buildFlagKey(key), "0");
  }

  /**
   * Deletes a feature flag
   * @param key
   * @returns void
   */
  public async deleteFlag(key: string): Promise<void> {
    await this.redis
      .multi()
      .srem("flags", key)
      .del(this.buildFlagKey(key))
      .exec();
  }

  /**
   * Gets all feature flags
   */
  public async getFlags() {
    const keys = await this.redis.smembers("flags");
    if (keys.length === 0) {
      return {};
    }

    const values = await this.redis.mget(keys.map((key) => `flag:${key}`));

    const mapped = keys.reduce((acc, key, index) => {
      acc.set(key, values[index] === "1");
      return acc;
    }, new Map<string, boolean>());

    return Object.fromEntries(mapped);
  }

  /**
   * Gets a feature flag
   * @param key
   * @returns boolean
   */
  public async getFlag(key: string): Promise<boolean> {
    const value = await this.redis.get(this.buildFlagKey(key));
    return value === "1";
  }

  /**
   * returns all keys in the flags set
   */
  public async getKeys() {
    return this.redis.smembers("flags");
  }

  /**
   * Flushes the redis database
   */
  public async flush() {
    return this.redis.flushall();
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new FlagService();
